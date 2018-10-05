export default class IoCContainer {

    private _services: Map<string, any>;
    private readonly _singletons: Map<string, any>;

    constructor() {
        this._services = new Map();
        this._singletons = new Map();
    }

    singleton(name: string, definition: Function, dependencies: Array<string>) {
        this._services.set(name, {definition: definition, dependencies: dependencies});
    }

    get(name: string) {
        const c = this._services.get(name);

        if (this._isClass(c.definition)) {

            const singletonInstance = this._singletons.get(name);
            if (singletonInstance) {
                return singletonInstance
            } else {
                const newSingletonInstance = this._createInstance(c);
                this._singletons.set(name, newSingletonInstance);
                return newSingletonInstance;
            }

        } else {
            return c.definition
        }
    }

    _getResolvedDependencies(service: any) {
        let classDependencies = [];
        if (service.dependencies) {
            classDependencies = service.dependencies.map((dep: string) => {
                return this.get(dep);
            });
        }
        return classDependencies;
    }

    _createInstance(service: any) {
        return new service.definition(...this._getResolvedDependencies(service))
    }

    _isClass(definition: any) {
        return typeof definition === 'function'
    }

    instantiate(): void {
        this._services.forEach((value: any, key: string) => {
            this.get(key);
        });
        console.log('IoCContainer initialized');
    }
}