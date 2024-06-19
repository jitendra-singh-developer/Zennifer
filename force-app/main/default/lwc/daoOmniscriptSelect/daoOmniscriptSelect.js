import OmniscriptSelect from "omnistudio/omniscriptSelect";
import tmpl from "./daoOmniscriptSelect.html";

/**
 * Extend OmniscriptSelect to support:
 * 1. Searching
 *     // OS Property JSON:
 *     {
 *        "searchable": true
 *     }
 * 2. Multiselect
 *    // OS Property JSON:
 *    {
 *        "multiple": true
 *     }
 */
export default class IqOmniscriptSelect extends OmniscriptSelect {
  get maxCount() {
    return this._propSetMap.maxCount ?? 5;
  }

  render() {
    return tmpl;
  }
}