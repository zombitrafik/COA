import IoCContainer from './core/annotations/ioc/container'

class ApplicationContext {
    private readonly container: IoCContainer;
    constructor() {
        this.container = new IoCContainer();
    }
    getContainer () {
        return this.container;
    }
    run () {
        require('./core/express');
        require('./repositories');
        require('./controllers');
        require('./services');

        this.container.instantiate();
    }
}

export {ApplicationContext}