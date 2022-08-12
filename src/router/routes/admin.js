import customers from './admin/customers'
import drivers from './admin/drivers'
import loads from './admin/loads'
// import settings from './admin/settings'
import trucktype from './admin/trucktype'
import numberstype from './admin/numberstype'
import carrier from './admin/carrier'
import carrierequipment from './admin/carrierequipment'
import warehouse from './admin/warehouse'
import custombroker from './admin/custombroker'
import driverstatus from './admin/driverstatus'
import driverlocation from './admin/driverlocation'
import drivertruck from './admin/drivertruck'
import equipmenttype from './admin/equipmenttype'
import loadstatus from './admin/loadstatus'
import loadwo from './admin/loadwo'
import trailer from './admin/trailer'
import truck from './admin/truck'
import user from './admin/user'
// import settings from './admin/settings'


function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: '/admin',
    name: 'admin',
    component: page('admin/main.vue'),
    redirect: { name: 'admin.loads' },
    children: [
        customers,
        drivers,
        loads,
        trucktype,
        numberstype,
        carrier,
        carrierequipment,
        warehouse,
        custombroker,
        driverstatus,
        driverlocation,
        drivertruck,
        equipmenttype,
        loadstatus,
        loadwo,
        trailer,
        truck,
        user,
        // settings,
        {
            path: 'settings',
            name: 'settings',
            component: page('admin/main.vue'),

            children: [

            ]
        }
    ]
}
