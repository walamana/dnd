import fs from "node:fs";

export namespace AccessAPI {

    const filePath = "./data/access.json";
    let access = null

    export function getAccess() {
        if (!access) {
            fs.watchFile(filePath, (curr, prev) => {
                try{
                    access = JSON.parse(fs.readFileSync(filePath, "utf-8"))
                }catch (ex) {
                    console.error(ex)
                }
            })
            access = JSON.parse(fs.readFileSync(filePath, "utf-8"))
        }
        return access
    }

    export function hasAccess(url, user) {
        const access = getAccess()
        url = url.replace(/\/$/, "")
        console.log("Access", url, user, access[url] && access[url].includes(user))
        return access[url] && (access[url] == "*"
            || (typeof access[url] === "object" && access[url].includes(user)))
    }


}