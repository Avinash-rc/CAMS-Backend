const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { v4: uuidv4 } = require("uuid"); // for generating unique IDs
const {verifyToken} = require("../middleware/authMiddleware");

async function authRoutes(fastify, options) {

    // REGISTer
    fastify.post("/register",async (req,reply)=>{
       
        const {name, email, password,role} = req.body;

        // Password Hashing
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await pool.query(
                "INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [uuidv4(), name, email, hashedPassword, role]
            );

            return reply.send({
                message : "User registered successfully",
                user : result.rows[0]

            })

        }
        catch(error){
            console.error("Error registering user:", error);
            return reply.code(500).send({ error: "Internal server error" });

        }
            
    })

    //LOGIN
    fastify.post("/login",async(req,reply)=>{
        const {email,password} = req.body;
        try{
            const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
            );

            if(!result.rows.length){
                return reply.code(401).send({error : "User not found"});
            }
            const user = result.rows[0];

            // check hashed password using bcrypt campare
            const validPassword= await bcrypt.compare(password,user.password);
            if(!validPassword){
                return reply.code(401).send({error : "Invalid password"});
            }
            
            // generate token from user id and role -- we can also add name and email for creating token
            const token= jwt.sign(
                {
                    id:user.id,
                    role:user.role
                },
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )

            return reply.send({
                message : "User logged in successfully",
                user : {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token
            })

        }
        catch(error){
            return reply.send({
                message : "Login Error..."
            })
        }
    })

    //current user
    fastify.get("/me",{ preHandler: verifyToken },
        async(req,reply)=>{
        return {
            message: " Current user fetched successfully",
            
        }

    })

    // PROTECTED ROUTE
    fastify.get("/protected",{ preHandler: verifyToken },async(req,reply)=>{
        return {
            message : "Protected route accessed successfully",
        }
    })

    // //logout
    // fastify.post("/logout",async(req,reply)=>{
    //     return reply.send({
    //         message : "User logged out successfully"
    //     })
    // })

}

module.exports = authRoutes

