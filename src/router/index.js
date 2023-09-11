import Home from "../../src/Home";
import Following from "../../src/Following";
import Upload from "../../src/Upload"
import Profile from "../../src/Profile";
import { HeaderOnly } from "../../src/layouts";
import config from "../config";

export const publicRouter = [
    {path: config.routers.home, component: Home},
    {path: config.routers.profile, component: Profile},
    {path: config.routers.following, component: Following},
    {path: config.routers.upload, component: Upload, layout : HeaderOnly},
]

export const privateRouter = []