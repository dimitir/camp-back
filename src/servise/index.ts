import authRoutes from './auth/routs';
import hikeRoutes from './hike/routs';
import testRoutes from './test/routs';


export default [
    ...authRoutes,
    ...hikeRoutes,
    ...testRoutes
]
