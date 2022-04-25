[Home](https://github.com/coolinmc6/front-end-dev) | [Vue Notes](https://github.com/coolinmc6/front-end-dev/blob/master/vue.md)

# Testing in Vue Notes

## Components

- Create the new file in your `__tests__` folder: `component-name.spec.js`
- Wrap the whole test suite in a describe with your component name:
```js
describe('component-name.vue', () => {
  // tests go here
})
```
- Import your test library
```js
import { shallowMount } from '@vue/test-utils';
```
- Adding Vuex requires `createLocalVue`. It's not difficult but it is more code. You need to look
at your component and understand what what items from Vuex you need.

```js
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
```
- And then when you need to mount your component, you can create your store like this:
```js
let store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: {
        data: { // name of state property is "data"; within that is "userData" prop
          userData: {
            zipcode: 12345,
            // etc.
          },
        },
      },
    },
    wallet: {
      namespaced: true,
      actions: {
        getWallet: jest.fn(),
      }
    }
  }
});
```
- When hitting an API, you need to mock the function. Assuming that it's a
Promise with both resolve and reject, you can something like this:

```js
// Import the functions
import {
  updateAuthDevice,
  updateUserInformation,
} from 'my-awesome-api';

// Mock the functions - here I'm mocking the module
jest.mock('my-awesome-api', () => ({
  updateAuthDevice: jest.fn(),
  updateUserInformation: jest.fn(),
}));

// Mock a success or failure

// Success
describe('Update Account Phone Flow - Success Block', () => {
  it(`if successful call to updateUserInformation, clear info,
      show success message, and close modal`, async () => {
    updateUserInformation.mockResolvedValue();
    await wrapper.vm.noButtonAction();
    jest.runAllTimers();
    expect(userActions.clearAccountInfo).toHaveBeenCalled();
    expect(userActions.showSuccessMessage).toHaveBeenCalled();
    expect(wrapper.emitted('handleClose')).toHaveLength(1);
  });
});

// Failure
describe('Update Account Phone Flow - Catch Block', () => {
  it('if the call fails, get the error message, save it to editPhoneError, and close modal', async () => {
    updateUserInformation.mockRejectedValue({});
    await wrapper.vm.noButtonAction();
    jest.runAllTimers();
    expect(userActions.setUserAccountInfo).toHaveBeenCalled();
    expect(wrapper.emitted('handleClose')).toHaveLength(1);
  });
});
```
  - the important part is this: `updateUserInformation.mockResolvedValue();` I tell my test that I
  want it to pass so that it reaches the `.then()`.
- 

## Component Examples

### Simple Component #1

```js
import { shallowMount } from '@vue/test-utils';
import Stuff from '@/components/Stuff.vue';
import StuffUpdater from '@/mixins/stuff-update';

describe('stuff.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Stuff, {
      propsData: {
        stuffDisplay: [110, 'test'],
        stuffAsDecimal: 1.1,
        loading: false,
        invalid: false,
      },
      mixins: [StuffUpdater],
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
```
- This very small component takes a few props and a mixin. It doesn't have methods or computed values so
I essentially just need to make sure it matches the snapshot.
- First, notice my imports: the test utilities, the component, and the component's mixin.
- The entire test suite is wrapped in a `describe` block with the file's name
- The one test is in a `describe` block for the snapshot

### Simple Component #2

```js
import { shallowMount } from '@vue/test-utils';
import DogLeash from '@/components/dog-leash.vue';

describe('dog-leash.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DogLeash, {
      propsData: {
        listOfLeashes: [{ leashStatus: 'FOUND' }],
        leashStatus: '',
      },
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('methods', () => {
    describe('dogLeashClass', () => {
      it('should handle lost leash class', () => {
        expect(
          wrapper.vm.dogLeashClass([{ leashStatus: 'LOST' }]),
        ).toHaveProperty('lost', true);
      });

      it('should handle a win and a lost class', () => {
        expect(
          wrapper.vm.dogLeashClass([
            { leashStatus: 'LOST' },
            { leashStatus: 'FOUND' },
          ]),
        ).toHaveProperty('lost', true);
      });

      it('should handle void leash class', () => {
        expect(
          wrapper.vm.dogLeashClass([{ leashStatus: 'VOID' }]),
        ).toHaveProperty('void', true);
      });

      it('should handle default case #1: unrecognized status', () => {
        expect(
          wrapper.vm.dogLeashClass([{ leashStatus: 'TEST' }]),
        ).toHaveProperty('void', true);
      });

      it('should handle default case #2: a found and an unrecognized status', () => {
        expect(
          wrapper.vm.dogLeashClass([
            { leashStatus: 'FOUND' },
            { leashStatus: 'TEST' },
          ]),
        ).toHaveProperty('void', true);
      });
    });
  });
});
```
- this DogLeash component has one method, `dogLeashClass`, which is based on the value of the `leashStatus` property.
The method looks at the statuses for a number of dog leashes and if any of them are `'LOST'`, it returns `'lost'`.
- The first part of the file is the normal imports, the `describe` block for the file, and the `wrapper` setup.
- In a separate `describe` block, I put my methods where I write a `describe` block for all my `dogLeashClass` tests.
- I am using the same pattern in my `expect` statements: `expect(methodCall).toHaveProperty('property', 'value')`
- The key take-away here is how I call the method: `wrapper.vm.dogLeashClass([])`.

### Advanced Component #1

```js
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AuctionSuccess from '@/components/auction-success.vue';
import { ObserveVisibility } from 'vue-observe-visibility';
import { mockWindowProperty } from '@/utilities/tests/jest.utils';

jest.mock('vue-observe-visibility', () => ({
  ObserveVisibility: jest.fn(),
}));

ObserveVisibility.mockImplementation(() => () => {
  return true;
});
const localVue = createLocalVue();
localVue.use(ObserveVisibility);
localVue.directive('observe-visibility', ObserveVisibility);

const props = {
  auctionSuccess: {
    coupon: {
      couponRef: '',
      bids: [
        {
          requestedAmount: 5000,
          minimumAmount: 10000,
        },
      ],
    },
  },
  keepBids: true,
  smallIcon: true,
};
describe('auction-success.vue', () => {
  let wrapper;
  mockWindowProperty('localStorage', {
    getItem: jest.fn().mockReturnValue(null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  });
  beforeEach(() => {
    wrapper = shallowMount(AuctionSuccess, {
      data() {
        return {
          isMainComponent: true,
        };
      },
      propsData: props,
      localVue,
    });
  });
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('computed', () => {
    describe('iconClass', () => {
      it('returns "small-icon" with smallIcon = true', () => {
        expect(wrapper.vm.iconClass).toBe('small-icon');
      });

      it('returns "" with smallIcon = false', () => {
        wrapper.setProps({ smallIcon: false });
        expect(wrapper.vm.iconClass).toBe('');
      });
    });

    describe('totalRequested', () => {
      it('should return correct total requested amount from bids array', () => {
        expect(wrapper.vm.totalRequested).toBe('5.00');
      });
      it('should return 0.00 from empty bids array', () => {
        wrapper.setProps({
          auctionSuccess: {
            coupon: {
              couponRef: '',
              bids: [{ requestedAmount: 0 }],
            },
          },
        });
        expect(wrapper.vm.totalRequested).toBe('0.00');
      });
    });

    describe('totalMinimum', () => {
      it('should return correct total minimum amount from bids array', () => {
        expect(wrapper.vm.totalMinimum).toBe('10.00');
      });
      it('should return 0.00 from empty bids array', () => {
        wrapper.setProps({
          auctionSuccess: {
            coupon: {
              couponRef: '',
              bids: [{ minimumAmount: 0 }],
            },
          },
        });
        expect(wrapper.vm.totalMinimum).toBe('0.00');
      });
    });

    describe('keepBidsCheckValue', () => {
      it('emits toggleKeep with true value when keepBidsCheckValue is true', async () => {
        wrapper.vm.keepBidsCheckValue = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('toggleKeep')).toHaveLength(1);
        expect(wrapper.emitted('toggleKeep')[0][0]).toEqual(true);
      });

      it('emits toggleKeep with false value when keepBidsCheckValue is false', async () => {
        wrapper.vm.keepBidsCheckValue = false;
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('toggleKeep')).toHaveLength(1);
        expect(wrapper.emitted('toggleKeep')[0][0]).toEqual(false);
      });
    });
  });

  describe('methods', () => {
    describe('visibilityChanged', () => {
      it('should set isMainComponent to true', () => {
        wrapper.vm.visibilityChanged(false);
        expect(wrapper.vm.isMainComponent).toBe(true);
      });
    });

    describe('handleConfirmSuccess', () => {
      it('should emit handleKeepBids if this.keepBids is true', () => {
        wrapper.vm.handleConfirmSuccess();
        expect(wrapper.emitted('handleKeepBidslip')).toHaveLength(1);
      });

      it('should emit handleClearBidslip if this.keepBids is false', () => {
        wrapper.setProps({ keepBids: false });
        wrapper.vm.handleConfirmSuccess();
        expect(wrapper.emitted('handleClearBidslip')).toHaveLength(1);
      });
    });
  });
});
```
- this file is more complicated

### Advanced Component #2

```js
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import EditAccountInformation from '../edit-account-information.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('edit-account-information.vue', () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            data: { // name of state property is "data"; within that is "userData" prop
              userData: {
                firstname: 'Joel',
                lastname: 'Embiid',
                username: 'jembiid',
                phone: '215-888-7878',
                email: 'jembiid@gmail.com',
                address1: '123 Sixers Lane',
                address2: '',
                city: 'Philadelphia',
                state: 'PA',
                zipcode: 12345,
              },
            },
          },
        },
      },
    });
    wrapper = shallowMount(EditAccountInformation, { localVue, store });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
```
- This component requires Vuex. I needed to access the user module and to get the snapshot
to work, I need to bring in Vuex. The trick is to create a `localVue`. The key part is
shortly after the imports where I create the `localVue` and then do `localVue.use(Vuex);`.
- After that, it's just a matter of adding my `store` instantiation in my `beforeEach`.

### Advanced Component #3

```js
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AlertModal from '../alert-modal';
import {
  updateAuthDevice,
  updateUserInformation,
} from 'my-awesome-api';

const localVue = createLocalVue();
localVue.use(Vuex);
jest.useFakeTimers();
jest.mock('my-awesome-api', () => ({
  updateAuthDevice: jest.fn(),
  updateUserInformation: jest.fn(),
}));

describe('changes-not-saved-modal', () => {
  let wrapper;
  let updateAuthBoolean = false;

  const userActions = {
    setUserAccountInfo: jest.fn(),
    showSuccessMessage: jest.fn(),
    clearAccountInfo: jest.fn(),
  };
  const appActions = {
    changeModalInfo: jest.fn(),
  };

  const refreshWrapper = () => {
    return (wrapper = shallowMount(AlertModal, {
      propsData: {
        open: true,
      },
      store: new Vuex.Store({
        modules: {
          user: {
            namespaced: true,
            actions: userActions,
            state: {
              editAccountInformation: {
                phone: '1234567890',
              },
            },
          },
          app: {
            namespaced: true,
            actions: appActions,
            state: {
              modals: {
                updateTwoFaPhone: {
                  updateAuthBoolean,
                },
              },
            },
          },
        },
      }),
      localVue,
    }));
  };
  beforeEach(() => {
    refreshWrapper();
  });
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('noButtonAction', () => {
    describe('Update Account Phone Flow - Success Block', () => {
      it(`if successful call to updateUserInformation, clear info,
          show success message, and close modal`, async () => {
        updateUserInformation.mockResolvedValue();
        await wrapper.vm.noButtonAction();
        jest.runAllTimers();
        expect(userActions.clearAccountInfo).toHaveBeenCalled();
        expect(userActions.showSuccessMessage).toHaveBeenCalled();
        expect(wrapper.emitted('handleClose')).toHaveLength(1);
      });
    });

    describe('Update Account Phone Flow - Catch Block', () => {
      it('if the call fails, get the error message, save it to editPhoneError, and close modal', async () => {
        updateUserInformation.mockRejectedValue({});
        await wrapper.vm.noButtonAction();
        jest.runAllTimers();
        expect(userActions.setUserAccountInfo).toHaveBeenCalled();
        expect(wrapper.emitted('handleClose')).toHaveLength(1);
      });
    });

    describe('Update Two Fa Phone Flow - Success Block', () => {
      beforeEach(() => {
        updateAuthBoolean = true;
        refreshWrapper();
      });
      it('should open TwoFaSetup modal with correct properties', async () => {
        updateAuthDevice.mockResolvedValue();
        await wrapper.vm.noButtonAction();
        expect(appActions.changeModalInfo).toHaveBeenCalled();
      });
    });
    describe('Update Two Fa Phone Flow - Catch Block', () => {
      beforeEach(() => {
        updateAuthBoolean = true;
        refreshWrapper();
      });
      it('should set error value in user store and close modal', async () => {
        updateAuthDevice.mockRejectedValue({});
        await wrapper.vm.noButtonAction();
        jest.runAllTimers();
        expect(userActions.setUserAccountInfo).toHaveBeenCalled();
        expect(wrapper.emitted('handleClose')).toHaveLength(1);
      });
    });
  });

  describe('yesButtonAction', () => {
    describe('Update both Account and 2FA Phones - Success Block', () => {
      it('if successful, load the twoFaSetup modal and close the update-two-fa-phone modal', async () => {
        updateUserInformation.mockResolvedValue();
        updateAuthDevice.mockResolvedValue();
        await wrapper.vm.yesButtonAction();
        jest.runAllTimers();
        expect(appActions.changeModalInfo).toHaveBeenCalled();
        expect(wrapper.emitted('handleClose')).toHaveLength(1);
      });
    });
    describe('Update both Account and 2FA Phones - Failure', () => {
      it('if calls fail, set error message and close the update-two-fa-phone modal', async () => {
        updateUserInformation.mockRejectedValue();
        await wrapper.vm.yesButtonAction();
        jest.runAllTimers();
        expect(userActions.setUserAccountInfo).toHaveBeenCalled();
        expect(wrapper.emitted('handleClose')).toHaveLength(1);
      });
    });
  });
});
```
# NOT CLEANED UP

### Testing Watchers

```js
describe('watch', () => {
  describe('highestOffer', () => {
    it('should update purchasePrice if input is not focused', async () => {
      await wrapper.vm.$options.watch.highestOffer.call(wrapper.vm, 1050);
      expect(wrapper.vm.purchasePrice).toBe(1050);
    });

    it('should not update purchasePrice if input is focused', async () => {
      wrapper.setData({
        isFocused: true,
      });
      await wrapper.vm.$options.watch.highestOffer.call(wrapper.vm, 1050);
      expect(wrapper.vm.purchasePrice).toBe(1000);
    });
  });
});