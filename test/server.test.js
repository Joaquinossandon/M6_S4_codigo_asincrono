process.env.FILE = "libros.test.json";
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");

chai.use(chaiHttp);

let idLibro;

describe("GET /libros", () => {
    it("Responde un código 200", (done) => {
        chai.request(app)
            .get("/libros")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
    it("Responde un JSON", (done) => {
        chai.request(app)
            .get("/libros")
            .end((err, res) => {
                chai.expect(res).to.be.json;
                done();
            });
    });
});

describe("POST /libros", () => {
    it("Agrega correctamente los libros", (done) => {
        chai.request(app)
            .post("/libros")
            .send({
                titulo: "Harry potter y la piedra filosofal",
                autor: "J.K. Hola",
                precio: 5000,
                editorial: "Los monitos",
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res.text).to.include("Libro creado");
                idLibro = res.body.id;
                done();
            });
    });
});

describe("DELETE /libros/:id", () => {
    it("Responde 404 si no encuentra el libro", (done) => {
        chai.request(app)
            .delete("/libros/unidinventado")
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                done();
            });
    });
    it("Elimina correctamente un libro", (done) => {
        chai.request(app)
            .delete(`/libros/${idLibro}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
});
