import jwt from 'jwt-simple';
describe('Route books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description'
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.com',
        password: '123456'
      }))
      .then(user => {
        Books
          .destroy({where: {}})
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({id: user.id}, jwtSecret);
            done();
          })
      })
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBooks = {
        id: 2,
        name: 'newBook',
        description: 'new Description'
      };
      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(newBooks)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBooks.id);
          expect(res.body.name).to.be.eql(newBooks.name);
          expect(res.body.description).to.be.eql(newBooks.description);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'updated book',
      };
      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
