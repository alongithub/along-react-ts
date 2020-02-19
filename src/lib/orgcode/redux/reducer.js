/* eslint-disable */
const initstate = {
    openkeys: [],
    selectkeys: undefined,
    currentkeys: undefined,
    orglist: undefined,
    userorg: undefined,
};

const orgcode = (state = initstate, action) => {
    switch (action.type) {
        case 'setorglist': {
            return {
                ...state,
                orglist: action.orglist,
            };
        }
        case 'setuserorg': {
            return {
                ...state,
                userorg: action.org,
            }
        }
        // 选择某个机构时
        case 'click': {
            const org = action.org;
            const level = org.LEVEL - 0;
            const schoollevel = 3;
            if (level === schoollevel) {
                return {
                    ...state,
                    selectkeys: org,
                    currentkeys: org,
                }
            } else {
                const openkeys = [];
                for (let i = 0; i < level; i ++) {
                    if (level - 1 === i) {
                        openkeys[i] = org;
                    } else {
                        openkeys[i] = state.openkeys[i];
                    }
                }
                return {
                    ...state,
                    openkeys,
                    selectkeys: undefined,
                    currentkeys: org,
                }
            }
        }
        default: return state;
    }
};
export default orgcode;
