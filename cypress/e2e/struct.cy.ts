/// <reference types="cypress" />
import { Ok } from "@chocolatelib/result";
import { State } from "@chocolatelib/state";
import { StateConcat, StateObjectKey } from "../../src";

describe("StateObjectKey", () => {
  it("should set and get value correctly", async () => {
    const state = new State(Ok({ a: "a", b: "b" }));
    const key = new StateObjectKey(state, "a");
    expect((await key).unwrap).to.equal("a");
  });

  it("should return err if key does not exist", async () => {
    const state = new State<{ [s: string]: string }>(Ok({ a: "a", b: "b" }));
    const key = new StateObjectKey(state, "c");
    expect((await key).err).to.be.true;
  });
});
