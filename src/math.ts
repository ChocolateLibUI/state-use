import { Ok } from "@chocolatelib/result";
import { StateDerived, StateResult } from "@chocolatelib/state";

export class StateMin extends StateDerived<number> {
  protected getter(values: Array<StateResult<number>>): StateResult<number> {
    return Ok(
      Math.min(
        ...values.map((value) => {
          if (value.ok) return value.value;
          else return Infinity;
        })
      )
    );
  }
}

export class StateMax extends StateDerived<number> {
  protected getter(values: Array<StateResult<number>>): StateResult<number> {
    return Ok(
      Math.max(
        ...values.map((value) => {
          if (value.ok) return value.value;
          else return -Infinity;
        })
      )
    );
  }
}
