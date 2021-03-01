[Home]() | [Vue Notes]()

# Vue Mastery

## Courses

|Course|Status|Repo|Notes|
|:---:|:---:|:---|:---:|
|Intro to Vue 2|**complete**|||
|Unit Testing Vue 2|**complete**|[VM-unit-testing-vue2](https://github.com/coolinmc6/VM-unit-testing-vue2)|[Notes](#unit-testing-vue-2)|


## Unit Testing Vue 2

Source: [https://www.vuemastery.com/courses/unit-testing/what-to-test](https://www.vuemastery.com/courses/unit-testing/what-to-test)

Repo: [https://github.com/Code-Pop/Unit-Testing-Vue2](https://github.com/Code-Pop/Unit-Testing-Vue2)

- Using the vue-cli to get started with a custom build was pretty interesting. It was cool to see how custom you could make
the project, including adding a bunch of normal items like Vuex, Testing (in Jest), and Vuetify

### 2

- Here are the basic steps of writing a unit test:
  - Create a test suite (block of tests) using the `describe` statement
  - Set up your tests using `test` or `it`
  - Mount the component using `mount`
  - Set data (if necessary) `setData()`
  - Assert what the result should be with `expect`
- Here are the tests we've written after this lesson:

```js
// spec stands for specification
import AppHeader from "@/components/AppHeader.vue";
import { mount } from "@vue/test-utils";

describe("AppHeader", () => { // #1
  test("If user is not logged in, do not show logout button", () => { // #2
    const wrapper = mount(AppHeader); // #3
    expect(wrapper.find("button").isVisible()).toBe(false);
  });

  test("If user is logged in, show logout button", async () => { // #2
    const wrapper = mount(AppHeader); // #3
    wrapper.setData({ loggedIn: true }); // #4

    await wrapper.vm.$nextTick(); // #4 => $nextTick allows you to make the expect function wait until data has been updated
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});
```
**Note:** when initially trying to run the tests with `yarn run test:unit`, it was failing because the regex 
wasn't matching - there were no tests that it could find. Unlike when the video was made, the path for my tests
was like this: `tests/unit/components/AppHeader.spec.js`. I added the "components" because it looks like that's
how they want you to write tests.

### 3

- Here are the tests for the RandomNumber component and a few things to look for:
  - 1: find an element in the DOM
  - 2: trigger an event in the DOM
  - 3: other expect functions from Jest
  - 4: passing in props to component

```js
import RandomNumber from "@/components/RandomNumber.vue";
import { mount } from "@vue/test-utils";

describe("RandomNumer", () => {
  test("By default, randomNumber data value should be 0", () => {
    const wrapper = mount(RandomNumber);
    expect(wrapper.html()).toContain("<span>0</span>"); // #1
  });

  test("If button is clicked, randomNumber should be between 1 and 10", async () => {
    const wrapper = mount(RandomNumber);
    wrapper.find("button").trigger("click"); // #1 & #2

    await wrapper.vm.$nextTick();

    const randomNumber = parseInt(wrapper.find("span").element.textContent);
    expect(randomNumber).toBeGreaterThan(1); // #3
    expect(randomNumber).toBeLessThan(10); // #3
  });

  test("If button is clicked, randomNumber should be between 200 and 300", async () => {
    const wrapper = mount(RandomNumber, { // #4
      propsData: {
        min: 200,
        max: 300
      }
    });
    wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const randomNumber = parseInt(wrapper.find("span").element.textContent);
    expect(randomNumber).toBeGreaterThan(200);
    expect(randomNumber).toBeLessThan(300);
  });
});
```

### 4

- Here are the tests from Lesson 4 and some things to look for:
  - 1: `it` instead of `test`
  - 2: setting the value of an input
  - 3: getting the form submission (and maybe all results of emitted events)
  - 4: comparing objects

```js
import LoginForm from "@/components/LoginForm.vue";
import { mount } from "@vue/test-utils";

describe("LoginForm", () => {
  it("emits an event with a user data paylod", () => { // #1
    const wrapper = mount(LoginForm);

    /*
    Note: When looking for the appropriate input, they recommend using the property data-testid in the input.
    That way, if a user changes some classnames, it won't break the tests. So it would be:
      data-testid="name-input" in the component, and then 
      wrapper.find('[data-testid="name-input"]') in the tests to find it
    */
    const input = wrapper.find('input[type="text"]');
    input.setValue("Colin McNamara"); // #2
    wrapper.trigger("submit"); // submit on form, not click on button

    const formSubmittedCalls = wrapper.emitted("formSubmitted"); // #3
    expect(formSubmittedCalls).toHaveLength(1);

    const expectedPayload = { name: "Colin McNamara" };
    expect(wrapper.emitted("formSubmitted")[0][0]).toMatchObject( // #4
      expectedPayload
    );
  });
});
```

### 5

- Here are our tests and some things to look for:
  - 1: a package like flush promises is used in testing to make this work. See 
  [Asynchronous behavior outside of Vue](https://vue-test-utils.vuejs.org/guides/testing-async-components.html#asynchronous-behavior-outside-of-vue)
  - 2: to clear previous calls from other tests
  - 3: importing services call

```js
import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios"; // #3
import flushPromises from "flush-promises"; // #1

jest.mock("@/services/axios"); 
beforeEach(() => {
  jest.clearAllMocks(); // #2
});

describe("MessageDisplay", () => {
  it("Calls getMessage and displays message", async () => {
    const mockMessage = "Hello from the db!";
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    // Note: Vue-test-utils can't access promises enqueued within lifecycle hooks (e.g. created)
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);
    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual(mockMessage);
  });

  it("Displays an error when getMessage call fails", async () => {
    const mockError = "Oops! Something went wrong.";
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent;
    expect(error).toEqual(mockError);
  });
});
```

### 6

```js
// Stub = placeholder, canned response, substitute for our child component
import MessageContainer from "@/components/MessageContainer";
import { mount } from "@vue/test-utils";

describe("MessageContainer", () => {
  it("Wraps the MessageDisplay component", () => {
    const wrapper = mount(MessageContainer, {
      stubs: {
        MessageDisplay: '<p data-testid="message">Hello from the db!</p>'
      }
    });

    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual("Hello from the db!");
  });
});
```