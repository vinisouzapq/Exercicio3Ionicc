import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PessoaService } from '../service/pessoa.service'
import { Pessoas } from '../model/pessoas.model'



@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    pessoas: Pessoas[] = [];

    constructor(private pessoaService: PessoaService, private geolocation: Geolocation) { }

    async ngOnInit() {

        await this.geolocation.getCurrentPosition().then((response) => {
            console.log("Iniciando");
            console.log("Latitude: " + response.coords.latitude + " Longitude: " + response.coords.longitude)
            this.pessoasProximas(response.coords.latitude, response.coords.longitude);
        }).catch((error) => {
            console.log('Erro ao gerar sua localização', error);
        });
    }

    async pessoasProximas(lat, long) {
        await this.pessoaService.enocontrarPessoasProximas(lat, long).then((x) => {
            console.log(x);
            x.forEach(x => {
                console.log(x);
                console.log(x.data);
                this.pessoas.push(x.data);
            })
            console.log(this.pessoas);
        }).catch((err) => {
            console.log(err);
        })
    }
}