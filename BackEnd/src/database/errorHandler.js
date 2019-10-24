
/**
 * 
 * @abstract class that return an error when mongoose fail to add, delete or update
 * and send it back to the front end.
 */
class MongooseError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}