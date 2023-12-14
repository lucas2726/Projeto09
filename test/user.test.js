let app = require("../src/app");
let supertest = require("supertest");
let request   = supertest(app);

describe("Cadastro de usuario",() => {
    test("Deve cadastrar um usuário com sucesso",()=> {
        let time = Date.now()//Para gerar um email aleatorio
        let email = `${time}@gmail.com`
        let user  = {name:"Victor", email:email,password:"12345"}//
       
        return request.post("/user")
        .send(user)
        .then(res =>{
            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);
        }).catch(error => {
          fail(error);
        });
    });

    test("Deve impedir que um usuário se cadastre com os dados vazios",() =>{
        let user  = {name:"", email:"",password:""};
       
        return request.post("/user")
        .send(user)
        .then(res =>{
          expect(res.statusCode).toEqual(400); // 400 = Bad request 
        }).catch(error => {
          fail(error);
        });
    });

    test("Deve impedir que o usuario se cadastre com um e-mail repetido",() => {
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user  = {name:"Victor", email:email,password:"12345"};
       
        return request.post("/user")
        .send(user)
        .then(res =>{
            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);
            return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.error).toEqual("Email já cadastrado");
            }).catch(err =>{
                 fail(err);
            });
        }).catch(err => {
                fail(err);
        });
    });

});