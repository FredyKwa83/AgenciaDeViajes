
const controller ={

    register: (req, res) => {
        //res.sendFile((__dirname + '/views/register.html'));
        res.render('register');
    },

    login :(req, res) => {
        //res.sendFile((__dirname + '/views/login.html'));
        res.render('login');
    }
}

module.exports = controller;