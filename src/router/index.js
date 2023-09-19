import Home from "../../src/Home";
import Following from "../../src/Following";
import Upload from "../../src/Upload"
import Profile from "../../src/Profile";
import Videos from "../../src/Videos";
import Live from "../../src/Live";
import Explore from "../../src/Explore";
import { HeaderOnly } from "../../src/layouts";
import config from "../config";

export const publicRouter = [
    {path: config.routers.home, component: Home},
    {path: config.routers.profile, component: Profile},
    {path: config.routers.following, component: Following},
    {path: config.routers.live, component: Live},
    {path: config.routers.explore, component: Explore},
    {path: config.routers.upload, component: Upload, layout : HeaderOnly},
    {path: config.routers.videos, component: Videos, layout : null},
    

]

export const privateRouter = []