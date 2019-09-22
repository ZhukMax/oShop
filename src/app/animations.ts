import { trigger, transition, style, animate, state } from '@angular/animations';

export let fade = trigger('fade', [
    state('void', style({ opacity: 0 })),
    transition(':enter, :leave', [
        animate(400)
    ])
]);

export let slide = trigger('slide', [
    state('void', style({ transform: 'translateX(20px)' })),
    transition(':enter', [
        animate(600)
    ]),
    transition(':leave', [
        animate('0.4s ease-in', style({ transform: 'translateX(100%)' }))
    ])
]);
