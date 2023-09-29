const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async createUser(req, res) {
        const { nome, email } = req.body;
        try {
            const userExist = await prisma.user.findFirst({
                where: {
                    email,
                },
            }); 
            
            if (userExist) {
                    return res.json("This user already exists!");
                } else {
                    const user = await prisma.user.create({
                        data: {                           
                            email,
                            nome,
                        },
                    });
                    res.json({ Mensagem: "User created successfully!" });
                }
        } catch (error) {
            res.json({ error });
        }
    },

    async searchUser(req, res) {
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id, 10) },
            });
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    async searchUsers(req, res) {
        const users = await prisma.user.findMany();
        res.json(users);
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
    
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!user) {
                return res.json({ error: "ERROR: This user don't exist, please try again." });
            }
    
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: { nome, email },
                select: {
                    nome: true,
                    email: true,
                },
            });
            return res.json(updatedUser);
    
        } catch (error) {
            res.json(error);
        }
    },
    
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
    
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!user) {
                return res.json({ error: "ERROR: This user don't exist, please try again." });
            }
    
            await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            return res.json("This user is deleted. Sorry.");
    
        } catch (error) {
            res.json(error);
        }
    },
    
};