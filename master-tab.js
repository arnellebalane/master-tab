import EventEmitter from '@arnellebalane/event-emitter';

const MasterTab = new EventEmitter();

const STORAGE_KEY = MasterTab.STORAGE_KEY || 'mastertab';
const INSTANCE_ID = MasterTab.INSTANCE_ID
    || Math.floor(Math.random() * 0x10000).toString(16);

const state = {
    ACTIVE: 0,
    PASSIVE: 1,
    HIDDEN: 2
};

const getTabState = () => {
    if (document.visibilityState === 'hidden') return state.HIDDEN;
    if (document.hasFocus()) return state.ACTIVE;
    return state.PASSIVE;
};

const getTabStack = () => {
    const tabStack = localStorage.getItem(STORAGE_KEY);
    return tabStack ? tabStack.split(';') : [];
};

const setTabStack = tabStack => {
    localStorage.setItem(STORAGE_KEY, tabStack.join(';'));
};

const handleTabStackChange = tabStack => {
    MasterTab.emit('change', tabStack[0] === INSTANCE_ID);
};

['pageshow', 'focus', 'visibilitychange'].forEach(event => {
    window.addEventListener(event, e => {
        if (getTabState() === state.HIDDEN) {
            return;
        }

        const tabStack = getTabStack();

        let index = tabStack.indexOf(INSTANCE_ID);
        if (index < 0) {
            index = tabStack.length;
        }

        tabStack.splice(index, 1);
        tabStack.unshift(INSTANCE_ID);

        setTabStack(tabStack);
        handleTabStackChange(tabStack);
    });
});

window.addEventListener('unload', () => {
    const tabStack = getTabStack();
    const index = tabStack.indexOf(INSTANCE_ID);

    tabStack.splice(index, 1);

    setTabStack(tabStack);
    handleTabStackChange(tabStack);
});

window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) {
        handleTabStackChange(getTabStack());
    }
});

export default MasterTab;
