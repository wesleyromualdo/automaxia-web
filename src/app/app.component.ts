import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "./resources/services/email.service";

function formatPhoneNumber(phoneNumber:any) {
    // Remover todos os caracteres não numéricos do número
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Verificar se o número tem o tamanho esperado
    if (cleanedNumber.length === 10) {
        const areaCode = cleanedNumber.slice(0, 2);
        const firstPart = cleanedNumber.slice(2, 6);
        const secondPart = cleanedNumber.slice(6, 10);

        return `(${areaCode}) ${firstPart}-${secondPart}`;
    } else {
        // Caso o número não tenha o tamanho esperado, retornar o número original
        return phoneNumber;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('videoElement') videoElement!: ElementRef;

    title = 'automaxia-web';
    emailForm: FormGroup;
    telefone = '';
    nome = ''

    constructor(private fb: FormBuilder, private email: EmailService) {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            nome: ['', Validators.required],
            telefone: ['', Validators.required]
        });
    }

    ngAfterViewInit() {
    }

    onPhoneNumberChange(event: any) {
        const rawValue = event.target.value;
        const formattedPhoneNumber = formatPhoneNumber(rawValue);
        this.telefone = formattedPhoneNumber;
    }

    sendEmail(){
        if( this.emailForm.valid ) {
            console.log(this.emailForm.value);
            const assunto = 'Contato via site';
            const corpo = 'Nome: '+this.emailForm.value.nome+'<br>' +
                'Telefone: '+this.emailForm.value.telefone;

            this.email.envioemail(assunto, corpo, this.emailForm.value.email)
        }
        this.emailForm.reset();
    }
}
