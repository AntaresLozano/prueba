const { createConnection } = require('mysql');
const app = require('../../config/server');
const bcryptjs = require('bcryptjs');
const connection = require('../../config/db');
const { request } = require('../../config/server');
const ejsLint = require('ejs-lint');


module.exports = app => {
    app.get('/', (req, res) => {
        console.log("Funciona");

        // res.render('../views/index.ejs');
        
        if (req.session.loggedin) {
            res.render('../views/index.ejs', {
                login: true,
                name: req.session.usuario

            })
        } else {
            res.render('../views/login.ejs', {
                login: false,
                name: "Por favor inicie sessión"
            })
        }

        app.get('/logout', (req, res) => {
            req.session.destroy(() => {
                res.redirect('/')
            })
        })



    });

    // vistas
    app.get('/login', (req, res) => {
        res.render('../views/login.ejs');
    })

    app.get('/register', (req, res) => {
        res.render('../views/register.ejs');
    })

    app.get('/index', (req, res) => {
        res.render('../views/index.ejs');
    })
    // app.get('/usuarios', (req, res) => {
    //     res.render('../views/usuarios.ejs');
    // })

    // solicitud post vista register
    app.post('/register', async (req, res) => {
        const { id, nombre, usuario, rol, departamento,contrasena } = req.body;
        console.log(req.body);
        let passwordHaash = await bcryptjs.hash(contrasena, 8);
    
        connection.query("INSERT INTO usuarios SET ?", {
            id:id,
            nombre: nombre,
            usuario:usuario,
            rol: rol,
            departamento:departamento,
            contrasena: passwordHaash
        }, async (error, results) => {
            if (error) {
                // res.render("../views/error.ejs");
                console.log(error);
            } else {
                res.render('../views/register.ejs', {
                    alert: true,
                    alertTitle: "Registro",
                    alertMessage: "Registro Exitoso",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'login'
                });
            }
        })

    });

    // solicitud post de login (autenticacion)
    app.post('/auth', async (req, res) => {
        const { usuario, contrasena } = req.body;
        let passwordHaash = await bcryptjs.hash(contrasena, 8);

        if (usuario && contrasena) {
            connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (error, results) => {
                if (results.length === 0 || !(await bcryptjs.compare(contrasena, results[0].contrasena))) {
                    res.render('../views/login.ejs', {
                        //config sweet alert error
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 3500,
                        ruta: ''

                    })
                } else {
                    req.session.loggedin = true,
                    req.session.usuario = results[0].usuario;
                    res.render('../views/index.ejs', {
                        alert: true,
                        alertTitle: "Ingreso Exitoso",
                        alertMessage: "Ha ingresado correctamente",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 3500,
                        ruta: 'index',
                        login: true,
                        name: req.session.usuario


                    });
                    console.log(req.session.usuario);
                }
            })

        }
    });




    // Visualización de usuarios
    app.get("/usuarios", (req,res) => {
        connection.query("SELECT * FROM usuarios", (err, result) => {
            if(err){
                console.log(error);;
            } else {
                res.render("../views/usuarios.ejs", {
                    usuarios: result
                    
                });
                console.log(result);
            }
        })
    });

    // Agregar usuario
    app.post("/addUsuario", (req,res) => {
        const {id, nombre, usuario, rol, departamento} = req.body;
        connection.query("INSERT INTO usuarios SET ?" , {
            id:id,
            nombre: nombre,
            usuario:usuario,
            rol: rol,
            departamento:departamento,
            
        }, (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.redirect("/usuarios")
            }
        })
    });

    // Borrar un usuaruo
    app.get("/deleteUsuario/:id", (req,res) => {
        const id = req.params.id;
        connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
            if(err){
                console.log(err)
            } else {
                connection.query("SELECT * FROM usuarios", (err, result) => {
                    if(err){
                        res.send(err);
                    } else {
                        res.render("../views/usuarios.ejs", {
                            usuarios: result,
                            alert:true,
                            ruta: "usuarios"
                        });
                    }
                })
            }
        })
    });

    //Editar usuario
    app.post("/editUsuario/:id", (req,res) => {
        const id_ = req.params.id;
        const {id,nombre, usuario, rol, departamento} = req.body
        console.log(req.body);
        connection.query("UPDATE usuarios SET id = ?, nombre = ?, usuario = ?, rol = ?, departamento = ? WHERE id = ?", [id,nombre, usuario, rol, departamento, id_], (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.redirect("/usuarios");
            }
        })
    });



}