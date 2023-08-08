import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import {get} from "@/utils/node-https-utils";
import {describe} from "mocha";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});


describe("NodeHttpsUtils", () => {
  it("get", () => {
    const res = get("https://www.baidu.com").param().build().doRequest().then(res=> {
      console.log(res);
    });
  });
})
