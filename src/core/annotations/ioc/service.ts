import 'reflect-metadata';
import IoCContainer from "./container";

export default function (container: IoCContainer) {
    return function Service(target: Function) {
        const dependencies = Reflect.getMetadata('design:paramtypes', target).map((dependency: any) => dependency.name);
        container.singleton(target.name, target, dependencies);

        console.log(`Initialize @Service annotation ---> ${target.name}`);
    };
}
