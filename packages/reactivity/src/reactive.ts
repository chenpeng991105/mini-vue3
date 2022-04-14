import { isObject } from "@vue/shared";

export function reactive(obj) {
    const proxyObj = new Proxy(obj, {
        get(target, property) {
            const result = Reflect.get(target, property)
            return isObject(result) ? reactive(result) : result
        },
        set(target, property, value) {
            const result = Reflect.set(target, property, value)
            return true
        }
    })

    return proxyObj
}