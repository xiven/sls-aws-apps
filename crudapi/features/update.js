const db = require('../db.js');

module.exports.updateTodo = (event, context, callback) => {
    const todo_id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    db.todo
      .update(body, 
        { where: { id: todo_id }, 
        returning: true
      })
      .then(resArr => {
          console.log(resArr);
          const [rowsAffected, todoArr] = resArr;
          console.log(`${rowsAffected} row(s) were updated with this obj: ${JSON.stringify(body)}`);
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              todo: todoArr[0]
            })
          });
      })
      .catch(error => {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            error: `There was an error updating todo id: ${todo_id}.`
          })
        });
      });
};