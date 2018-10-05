import {app} from '../../../app';

import ServiceAnnotation from './service'
import ControllerAnnotation from './controller'
import RepositoryAnnotation from './repository'

const container = app.context.getContainer();

export function Service () {
    return ServiceAnnotation(container);
}

export function Controller() {
    return ControllerAnnotation(container)
}

export function Repository() {
    return RepositoryAnnotation(container);
}
