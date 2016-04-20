'use babel';

import LanguageOsirisView from './language-osiris-view';
import { CompositeDisposable } from 'atom';

export default {

  languageOsirisView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageOsirisView = new LanguageOsirisView(state.languageOsirisViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageOsirisView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-osiris:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageOsirisView.destroy();
  },

  serialize() {
    return {
      languageOsirisViewState: this.languageOsirisView.serialize()
    };
  },

  toggle() {
    console.log('LanguageOsiris was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
