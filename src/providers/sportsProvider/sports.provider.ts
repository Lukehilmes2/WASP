import { HttpClient } from '@angular/common/http';
import { Injectable,NgZone, } from '@angular/core';
import {Profile} from '../../models/profile.model';
import {AngularFireAuth} from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import {App} from "ionic-angular";
import { ConditionalExpr } from '@angular/compiler';
import {Game} from '../../models/sports.model';


@Injectable()
export class sportsProvider {

    week14 = [{'game':{"team1":"Jets","team2":"Bills","date":"12/09","time":1100}},
                {'game':{"team1":"Panthers","team2":"Browns","date":"12/09","time":1100}},
                {'game':{"team1":"Falcons","team2":"Packers","date":"12/09","time":1100}},
                {'game':{"team1":"Ravens","team2":"Chiefs","date":"12/09","time":1100}},
                {'game':{"team1":"Patriots","team2":"Dolphins","date":"12/09","time":1100}},
                {'game':{"team1":"Saints","team2":"Buccaneers","date":"12/09","time":1100}},
                {'game':{"team1":"Giants","team2":"Red Skins","date":"12/09","time":1100}},
                {'game':{"team1":"Colts","team2":"Texans","date":"12/09","time":1100}},
                {'game':{"team1":"Bengals","team2":"Chargers","date":"12/09","time":1405}},
                {'game':{"team1":"Broncos","team2":"49's","date":"12/09","time":1405}},
                {'game':{"team1":"Eagles","team2":"Cowboys","date":"12/09","time":1405}},
                {'game':{"team1":"Steelers","team2":"Raiders","date":"12/09","time":1405}},
                {'game':{"team1":"Lions","team2":"Cardinals","date":"12/09","time":1405}},
                {'game':{"team1":"Rams","team2":"Bears","date":"12/09","time":1405}},
                {'game':{"team1":"Vikings","team2":"Seahawks","date":"12/10","time":1815}},
                    
            ];

    game: Game;
    


  constructor(private afAuth: AngularFireAuth,
     private afDataBase: AngularFireDatabase,
     public app: App, public zone: NgZone,) {
    console.log('Profile Provider');
  }

getTeams(selectedGame){
    this.game.team1 = selectedGame[0];
    this.game.team2 = selectedGame[1];

}
getGames(){
    return this.week14;
}



}
