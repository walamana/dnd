import {AccessAPI} from "../api/access.ts";
import {defineMiddleware} from "astro:middleware";

export const applyPageTree = defineMiddleware(async (context, next) => {
    // console.log("Context", context)
    const user = context.cookies.get("user")?.value;
    const pageTree = await getPathTree(user)
    console.log(pageTree)

    context.locals["pageTree"] = pageTree

    if(!AccessAPI.hasAccess(context.url.pathname, user)) {
        return context.redirect("/", 301)
    }


    return next()
})

async function getPathTree(user): Promise<any> {
    const files = await import.meta.glob("./../pages/**/*.{md,mdx}")
    let records = []
    for (let file in files) {
        records.push(await files[file]())
    }
    records = records.filter(r => {
        return AccessAPI.hasAccess(r.url, user)
    })
    const pages: { path: string[], title: string, url: string }[] = records.map(p => {
        const path = p.url.split("/");

        // console.log(p.file ,path)
        path.splice(0, 1)

        const filePathParts = p.file.split("/");
        if (!filePathParts[filePathParts.length - 1].includes("index")) {
            path.splice(path.length - 1, 1)
        }
        const title = p.getHeadings().length > 0 ? p.getHeadings()[0].text : filePathParts[filePathParts.length - 1];
        return {path, title, url: p.url}
    })

    interface Page {
        title: String,
        url: String
    }

    interface Directory {
        name: string,
        children: (Directory | Page)[]
    }

    let pageTree: Directory = {
        name: "#root",
        children: []
    }

    for (let page of pages) {
        var root = pageTree;
        for (let sub of page.path) {

            let subdir: Directory = <Directory>root.children.find(c => c["name"] == sub)

            if (!subdir) {
                subdir = {
                    name: sub,
                    children: []
                }
                root.children.push(subdir)
            }
            root = subdir
        }

        root.children.push({title: page.title, url: page.url})
    }

    return pageTree
}
