import EventEmitter from '@arnellebalane/event-emitter';

const MasterTab = new EventEmitter();

const STORAGE_KEY = MasterTab.STORAGE_KEY || 'mastertab';
const INSTANCE_ID = MasterTab.INSTANCE_ID
    || Math.floor(Math.random() * 0x10000).toString(16);

const state = {
    ACTIVE: 'a',
    PASSIVE: 'p',
    HIDDEN: 'h'
};

const getState = () => {
    if (document.visibilityState === 'hidden') return state.HIDDEN;
    if (document.hasFocus()) return state.ACTIVE;
    return state.PASSIVE;
};

const findLastTabWithState = (tabStack, state) => {
    for (let i = tabStack.length - 1; i >= 0; i--) {
        const [instanceId, instanceState] = tabStack[i].split(':');
        if (instanceState === state) {
            return instanceId;
        }
    }
    return null;
};

const handleTabStackChange = tabStackString => {
    const tabStack = tabStackString ? tabStackString.split(';') : [];
    const tabStates = [state.ACTIVE, state.PASSIVE, state.HIDDEN];

    for (const tabState of tabStates) {
        const selectedTab = findLastTabWithState(tabStack, tabState);
        if (selectedTab) {
            return MasterTab.emit('change', selectedTab === INSTANCE_ID);
        }
    }
};

['pageshow', 'pagehide', 'focus', 'blur', 'visibilitychange'].forEach(event => {
    window.addEventListener(event, () => {
        const tabStackString = localStorage.getItem(STORAGE_KEY);
        const tabStack = tabStackString ? tabStackString.split(';') : [];

        let index = tabStack.findIndex(tab => tab.split(':')[0] === INSTANCE_ID);
        if (index < 0) {
            index = tabStack.length;
        }

        const currentState = getState();
        tabStack[index] = [INSTANCE_ID, currentState].join(':');

        if (currentState === state.ACTIVE) {
            tabStack.push(tabStack[index]);
            tabStack.splice(index, 1);
        }

        const updatedTabStackString = tabStack.join(';');
        localStorage.setItem(STORAGE_KEY, updatedTabStackString);
        handleTabStackChange(updatedTabStackString);
    });
});

window.addEventListener('unload', () => {
    const tabStackString = localStorage.getItem(STORAGE_KEY);
    const tabStack = tabStackString ? tabStackString.split(';') : [];
    const index = tabStack.findIndex(tab => tab.split(':')[0] === INSTANCE_ID);

    if (index >= 0) {
        tabStack.splice(index, 1);
    }

    const updatedTabStackString = tabStack.join(';');
    localStorage.setItem(STORAGE_KEY, updatedTabStackString);
});

window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) {
        handleTabStackChange(e.newValue);
    }
});

export default MasterTab;
