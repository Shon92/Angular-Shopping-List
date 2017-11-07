import { Component } from '@angular/core';

@Component({
  selector: 'my-nav',
  templateUrl: './navbar.component.html'
})
export class Navbar {
    clearLocalStorage(){
        localStorage.clear();
    }
}
