
import ViewerView from '../Viewer'

/**
 * TextViewer Brick View.
 */
export default class TextViewerView extends ViewerView {
  /**
   * Constructor
   */
  constructor () {
    super()
    this._text = ''
    this._disabled = false
    this._$textarea = null
  }

  /**
   * Returns text.
   * @return {string}
   */
  getText () {
    return this._text
  }

  /**
   * Sets text.
   * @param {string} text
   * @return {ViewerView} Fluent interface
   */
  setText (text) {
    if (this._text !== text) {
      this._text = text

      if (this._$textarea !== null) {
        this._$textarea.value = text
        this.layoutTextarea()
      }
    }
    return this
  }

  /**
   * Returns wether input is disabled.
   * @return {boolean}
   */
  isDisabled () {
    return this._disabled
  }

  /**
   * Sets wether input is disabled.
   * @param {boolean} disabled
   * @return {TextViewerView} Fluent interface
   */
  setDisabled (disabled) {
    this._disabled = disabled
    if (this._$textarea !== null) {
      if (disabled) {
        this._$textarea.setAttribute('disabled', 'disabled')
      } else {
        this._$textarea.removeAttribute('disabled')
      }
    }
    return this
  }

  /**
   * Renders view.
   * @protected
   * @return {HTMLElement}
   */
  render () {
    let $root = super.render()
    $root.classList.add('viewer-text')
    return $root
  }

  /**
   * Renders content.
   * @protected
   * @return {BrickView} Fluent interface
   */
  renderContent () {
    this._$textarea = document.createElement('textarea')
    this._$textarea.classList.add('viewer-text__textarea')
    this._$textarea.setAttribute('spellcheck', 'false')
    this._$textarea.value = this._text

    if (this.isDisabled()) {
      this._$textarea.setAttribute('disabled', 'disabled')
    }

    this._$textarea.addEventListener(
      'input', this.textareaValueDidChange.bind(this), false)

    let $content = super.renderContent()
    $content.appendChild(this._$textarea)
    return $content
  }

  /**
   * Triggered when textarea value changed.
   * @protected
   * @param {Event} evt
   */
  textareaValueDidChange (evt) {
    if (this.isDisabled()) {
      evt.preventDefault()
      return false
    }

    let text = this._$textarea.value

    if (this._text !== text) {
      this._text = text

      // notify model about text change
      this.getModel().viewTextDidChange(this, this._text)

      this.layoutTextarea()
    }
  }

  /**
   * Layouts view and its subviews.
   * @return {View}
   */
  layout () {
    this.layoutTextarea()
    return super.layout()
  }

  /**
   * Calculates height nessesary to view the text without scrollbars.
   * @protected
   * @return {TextViewerView} Fluent interface
   */
  layoutTextarea () {
    this._$textarea.style.height = ''
    this._$textarea.style.height = this._$textarea.scrollHeight + 'px'
    return this
  }
}
