import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for commitment-network', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be commitment-network', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('commitment-network');
    })
  });

  it('network-name should be commitment-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('commitment-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be commitment-network',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('commitment-network');
    });
  });

  
    it('Commitment component should be loadable',() => {
      page.navigateTo('/Commitment');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Commitment');
      });
    });

    it('Commitment table should have 7 columns',() => {
      page.navigateTo('/Commitment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('CommitmentContract component should be loadable',() => {
      page.navigateTo('/CommitmentContract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CommitmentContract');
      });
    });

    it('CommitmentContract table should have 11 columns',() => {
      page.navigateTo('/CommitmentContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Seller component should be loadable',() => {
      page.navigateTo('/Seller');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Seller');
      });
    });

    it('Seller table should have 5 columns',() => {
      page.navigateTo('/Seller');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Servicer component should be loadable',() => {
      page.navigateTo('/Servicer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Servicer');
      });
    });

    it('Servicer table should have 5 columns',() => {
      page.navigateTo('/Servicer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Mediator component should be loadable',() => {
      page.navigateTo('/Mediator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Mediator');
      });
    });

    it('Mediator table should have 5 columns',() => {
      page.navigateTo('/Mediator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('LoanDelivered component should be loadable',() => {
      page.navigateTo('/LoanDelivered');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LoanDelivered');
      });
    });
  
    it('SetupDemo component should be loadable',() => {
      page.navigateTo('/SetupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDemo');
      });
    });
  

});