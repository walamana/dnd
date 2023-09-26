import {sequence} from "astro/middleware";
import {auth} from "./auth.ts";
import {applyPageTree} from "./pageTree.ts";


export const onRequest = sequence(auth, applyPageTree)