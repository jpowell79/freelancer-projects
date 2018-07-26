const urls = require('../../services/urls');
const passwordHash = require('password-hash');
const validation = require('../../services/validation');
const roles = require('../../services/roles');

const registerUser = ({username, email, role, password}, res, sequelize) => {
    if(!username || !email || !role || !password){
        res.status(400).send('Missing required fields.');
        return;
    }

    const passwordErrors = validation.getPasswordError(password);

    if(passwordErrors !== ''){
        res.status(400).send(passwordErrors);
        return;
    }

    if(role === roles.admin){
        res.status(400).send('You cannot create admin accounts through this api.');
        return;
    }

    const hash = passwordHash.generate(password);

    return sequelize.models.users
        .findOne({where: {username}})
        .then(user => {
            if (user !== null) throw new Error("User already exists.");

            //TODO: Send confirm email.

            return sequelize.models.users.create({
                username,
                email,
                role,
                passwordHash: hash
            });
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send(err.toString());
        });
};

const handlePost = (body, res, sequelize) => {
    if(!body){
        res.sendStatus(400);
        return;
    }

    if(body.isActivated){
        //TODO: Activate User
    } else {
        registerUser(body, res, sequelize);
    }
};

module.exports = (server, sequelize) => {
    server.use(urls.users, (req, res) => {
        switch (req.method){
        case "GET":
            res.sendStatus(200);
            break;
        case "POST":
            handlePost(req.body, res, sequelize);
            break;
        default:
            res.sendStatus(400);
            break;
        }
    });
};