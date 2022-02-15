import { createStore, Store, useStore as baseUseStore } from 'vuex';

export const store  = createStore ({
    state:{
        isCollaspe:false
    },
    mutations:{
        setCollaspe(state,collaspe:boolean){
            state.isCollaspe = collaspe
        }
    },
    actions:{

    },
    modules:{

    }
})