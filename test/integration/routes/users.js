describe('Route users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@test.com',
    password: 'test'
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => { Users.create(defaultUser); })
      .then(() => { done(); });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUsers = {
        id: 2,
        name: 'newUser',
        email: 'newemail@test.com',
        password: 'newpassword'
      };
      request
        .post('/users')
        .send(newUsers)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUsers.id);
          expect(res.body.name).to.be.eql(newUsers.name);
          expect(res.body.email).to.be.eql(newUsers.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updated user',
        email: 'updatedemail@test.com',
      };
      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
