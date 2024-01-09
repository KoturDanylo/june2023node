// const express = require('express')
//
// const app = express();
//
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
//
// const users = [
//     { id: 1, name: 'Іван', email: 'ivan@example.com', age: 10 },
//     { id: 2, name: 'Марія', email: 'maria@example.com' },
//     { id: 3, name: 'Петро', email: 'petro@example.com' },
//     { id: 4, name: 'Ольга', email: 'olga@example.com' },
//     { id: 5, name: 'Андрій', email: 'andriy@example.com' },
//     { id: 6, name: 'Наталія', email: 'natalia@example.com' },
//     { id: 7, name: 'Максим', email: 'maxim@example.com' },
//     { id: 8, name: 'Софія', email: 'sofia@example.com' },
//     { id: 9, name: 'Анна', email: 'anna@example.com' },
//     { id: 10, name: 'Олександр', email: 'oleksandr@example.com' }
// ];
//
// app.get('/users', (req, res)=>{
//     res.status(200).json(users);
// });
//
// app.get('/users/:id', (req, res)=>{
//    const{id}=req.params
//
//
//     res.json({
//         data:users[+id-1]
//     });
// });
//
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email, age } = req.body;
//
//     if (!name || !email) {
//         return res.status(400).json({ error: 'Name and email are required fields.' });
//     }
//
//     const userToUpdate = users[+id - 1];
//
//     if (!userToUpdate) {
//         return res.status(404).json({ error: 'User not found.' });
//     }
//
//     userToUpdate.name = name;
//     userToUpdate.email = email;
//     if (age !== undefined) {
//         userToUpdate.age = age;
//     }
//
//     res.json({
//         message: 'User updated successfully',
//         data: userToUpdate
//     });
// });
//
// app.post('/users', (req, res)=>{
//     const body = req.body;
//     users.push(body);
//
//     res.status(201).json({
//         message: "User was created!"
//     })
// });
//
// app.delete('/users/:id', (req, res)=>{
//     const { id } = req.params;
//     users.splice(+id-1, 1);
//
//     res.sendStatus(204);
// })
//
//
//
// // CRUD: c - create, r - read, u - update, d - delete
//
// const PORT = 3000;
// app.listen(PORT, ()=>{
//     console.log(`Server has started on PORT ${PORT}`);
// })

const express = require('express');
const {read, write} = require('./fs.service');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    try {
        const users = await read();
        res.status(200).json({data: users});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            throw new Error('wrong ID param');
        }

        const users = await read();
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new Error('user not found');
        }
        res.json({data: users[index]});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const {email, name, age} = req.body;
        if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
            throw new Error('wrong age');
        }
        if (!email || !email.includes('@')) {
            throw new Error('wrong email');
        }
        if (!name || name.length <= 3) {
            throw new Error('wrong name');
        }
        const users = await read();

        const newUser = {id: users[users.length - 1].id + 1, email, name, age};
        users.push(newUser);
        await write(users);

        res.status(201).json({data: newUser});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            throw new Error('wrong ID param');
        }

        const users = await read();
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new Error('user not found');
        }
        users.splice(index, 1);
        await write(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message);
    }
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
})