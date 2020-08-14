import hebrew from "simple-keyboard-layouts/build/layouts/hebrew";
import russian from "simple-keyboard-layouts/build/layouts/russian";

export default {
    en: {
        abc: 'abcdefghijklmnopqrstuvwxyz',
        label: 'Aplhabet',
        name: 'English',
        layout: null
    },
    he: {
        abc: 'אבגדהוזחטיכלמנסעפצקרשת',
        label: 'אלף-בית',
        name: 'עברית',
        layout: hebrew
    },
    ru: {
        abc: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
        label: 'Алфавит',
        name: 'Русский',
        layout: russian
    }
}