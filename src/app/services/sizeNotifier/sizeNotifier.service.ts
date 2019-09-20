import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

import { IBreakPointObserver } from '../../Interfaces/IBreakPoints';

@Injectable({
  providedIn: 'root'
})
export class SizeNotifierService {

  /**
   * Variable containing the current screen size. Is returned by checkScreenSize()
   */
  private screenSizeUpdater: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private bpo: BreakpointObserver) {}

  /**
   * Checks the screen size by subscribing to observe method of BreakPointObserver. Calls the getScreenType() method to
   * filter the result of BreakPointObserver and get the screen type
   * @returns an observable of type string that contains the screen type
   */
  public checkScreenSize(): BehaviorSubject<string> {
    this.bpo.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe((res) => {
      if (res.matches) {
        this.getScreenType(res.breakpoints);
      }
    });
    return this.screenSizeUpdater;
  }

  /**
   * Iterates through the BreakPointObserver results and finds the screen type. Matches the screen type description
   * against BreakPoint aliases to get the matching alias. Assigns the alias to screenSizeUpdater
   * @param bpo The result of the observe method of BreakPointObserver
   */
  private getScreenType(bpo: IBreakPointObserver) {
    for (const bp in bpo) {
      if (bpo[bp]) {
        const breakPoints: {[key: string]: string} = Breakpoints;
        for (const screen in breakPoints) {
          if (breakPoints[screen] === bp) {
            this.screenSizeUpdater.next(screen);
          }
        }
      }
    }
  }
}
