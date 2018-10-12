import {Service} from "../core/annotations/ioc";
import UserRepository from "../repositories/user-repository";

@Service()
export default class UserService {

    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    login(params: any, req: any, res: any) {
        return this.userRepository.findByUsername(params.username)
            .then(function (user: any) {
                if(!user) {
                    res.statusCode = 401;
                    return Promise.resolve({error: 'Invalid username or password'});
                }
                if(user.password === params.password) {
                    req.session.user = user;
                    return Promise.resolve({});
                } else {
                    res.statusCode = 401;
                    return Promise.resolve({error: 'Invalid username or password'});
                }
            })
            .catch(function (error: any) {
                res.statusCode = 500;
                console.log(error);
                return Promise.resolve(error);
            });
    }

    createUser(body: any, res: any) {
        return this.userRepository.create(body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    getAllUsers() {
        return this.userRepository.getAll();
    }

    updateUser(id: string, body: any, res: any) {
        return this.userRepository.update(id, body)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

    deleteUser(id: number, req: any, res: any) {
        if(req.session.user.id === id) {
            res.statusCode = 400;
            return {error: 'Can not delete yourself'};
        }
        return this.userRepository.delete(id)
            .catch(function (error: any) {
                res.statusCode = 400;
                return Promise.resolve(error.errors);
            });
    }

}