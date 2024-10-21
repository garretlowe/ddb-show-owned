/*
 * D&D Beyond - Owned Only | Adds rating histograms to public lists on Letterboxd
 * Copyright (C) 2024  Garret Lowe
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const DISPLAY_NONE = 'display: none'
const DISPLAY_INLINE = 'display: inline'

function createElementWithAttributes (tagName: string, attributes?: Record<string, string>): HTMLElement {
  const element = document.createElement(tagName)
  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName])
  }
  return element
}

function createInputElementWithAttributes (attributes?: Record<string, string>): HTMLInputElement {
  const element = document.createElement('input')
  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName])
  }
  return element
}

function toggleUnownedSourceItems (toggleBox: HTMLInputElement) {
  for (const sourceItem of sourceItems) {
    if (!sourceItem.querySelector('span.owned-content')) {
      sourceItem.setAttribute('style', toggleBox.checked ? DISPLAY_NONE : DISPLAY_INLINE)
    }
  }
}

const sourceItems = document.querySelectorAll('li.sources-listing--item-wrapper')
const toggleBoxDiv = createElementWithAttributes('div', { class: 'owned-toggle-box-container' })

const toggleBox = createInputElementWithAttributes({
  name: 'Show Owned',
  type: 'checkbox',
  id: 'owned-toggle-box',
  checked: 'checked'
})
toggleBox.addEventListener('change', function () { toggleUnownedSourceItems(this) })
toggleUnownedSourceItems(toggleBox)

const toggleBoxLabel = createElementWithAttributes('label', {
  name: 'Show Owned Label',
  for: 'owned-toggle-box'
})
toggleBoxLabel.textContent = 'Show owned only  '
toggleBoxLabel.appendChild(toggleBox)
toggleBoxDiv.appendChild(toggleBoxLabel)

document.querySelector('div.ddb-collapsible-filter')?.appendChild(toggleBoxDiv)
