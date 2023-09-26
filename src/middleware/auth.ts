import {defineMiddleware} from "astro:middleware";

export const auth = defineMiddleware((context, next) => {
    if(!context.cookies.has("user") && context.url.pathname !== "/login") {
        return context.redirect("/login")
    }
    return next()
})