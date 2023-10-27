
function labelGenerator(quantity, start, preFor, className, where) {
    const dad = document.querySelector(where); // onde vou por as labels
    for (i = start; i < quantity + start; i++) {
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add(className);
      label.setAttribute('for', preFor + i);
      label.innerText = i < 10 ? '0' + i : i;
      dad.appendChild(label);
    }
  }
  
  function inputGenerator(type, quantity, start, preId, name, where, func) {
    const dad = document.querySelector(where); // onde vou por os inputs
    for (i = start; i < quantity + start; i++) {
      let input = document.createElement('input');
      input.setAttribute('type', type);
      input.setAttribute('name', name);
      input.setAttribute('id', preId + i);
      input.setAttribute('value', i);
      input.classList.add('hidden');
      input.addEventListener('change', func);
      dad.appendChild(input);
    }
  }
  
  function changeRadio(e) {
  
    let radioId = e.target.id;
    let radioValue = parseInt(e.target.value);
  
    for (let i = 0; i < todasLabels.length; i++) {
      todasLabels[i].classList.remove('label-active');
      if (todasLabels[i].getAttribute('for') == radioId) {
        todasLabels[i].classList.add('label-active');
      }
    }
  
    let spanValor = document.querySelector('#valor');
  
    switch (radioValue) {
      case 6:
        spanValor.innerText = 'R$ 4,50';
        break;
        
      case 7:
        spanValor.innerText = 'R$ 31,50';
        break;
  
      case 8:
        spanValor.innerText = 'R$ 126,00';
        break;
  
      case 9:
        spanValor.innerText = 'R$ 378,00';
        break;
  
      case 10:
        spanValor.innerText = 'R$ 945,00';
        break;
        
      case 11:
        spanValor.innerText = 'R$ 2.079,00';
        break;
  
      case 12:
        spanValor.innerText = 'R$ 4.158,00';
        break;
  
      case 13:
        spanValor.innerText = 'R$ 7.722,00';
        break;
  
      case 14:
        spanValor.innerText = 'R$ 13.513,50';
        break;
  
      case 15:
        spanValor.innerText = 'R$ 22.522,50';
        break;
  
      default:
        break;
    }
  }
  
  labelGenerator(10, 6, 'radio-', 'radio-label','.container-labels');
  inputGenerator('radio', 10, 6, 'radio-', 'qnt-numbers', '.container-labels', changeRadio);
  
  let todasLabels = document.querySelectorAll('.radio-label');
  todasLabels[0].click(); // dispara um click na primeira label para o input já vir marcado.
  
  
  let marcados = 0;
  
  function changeCheckbox(e) {
  
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    let restantes = document.querySelector('#restantes');
    let check = e.target;
  
    for (const label of checkLabels) {
  
      if (label.getAttribute('for') == check.id) {     
  
        if (label.classList.contains('label-active')) {
          label.classList.remove('label-active');
          marcados--;
          restantes.innerText = `${quantity - marcados} restantes`;
  
          if (marcados == quantity - 1) {
            for (const checkbox of allCheckbox) {
              if(!checkbox.checked) {
                checkbox.removeAttribute('disabled');
              }
            }
          }
  
        } else if (marcados < quantity){
          label.classList.add('label-active');
          marcados++;
          restantes.innerText = `${quantity - marcados} restantes`;
        }
  
        if (marcados == quantity) {
  
          enableButton(true);
  
          for (const checkbox of allCheckbox) {
            if(!checkbox.checked) {
              checkbox.setAttribute('disabled', '');
            }
          }
  
        } else {
          enableButton(false);
        }
      } // fim if
    } // fim for
  } // fim function
  
  function enableButton(checker) {
    let button = document.querySelector('#btn-bet');
    if (checker) {
      button.removeAttribute('disabled');
      button.classList.remove('btn-disabled');
      button.classList.add('btn-enabled');
    } else {
      button.setAttribute('disabled', '');
      button.classList.remove('btn-enabled');
      button.classList.add('btn-disabled');
    }
  }
  
  function verificaQuantidade() {
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    let button = document.querySelector('#btn-bet');
    if ((quantity - marcados) < 0) {
      button.setAttribute('disabled', '');
      button.classList.remove('btn-enabled');
      button.classList.add('btn-disabled');
    } else if(quantity > marcados){
      button.setAttribute('disabled', '');
      button.classList.remove('btn-enabled');
      button.classList.add('btn-disabled');
      for (const checkbox of allCheckbox) {
        if(!checkbox.checked) {
          checkbox.removeAttribute('disabled');
        }
      }
    }
  }
  
  labelGenerator(60, 1, 'check-', 'check-label','.choose-numbers');
  inputGenerator('checkbox', 60, 1, 'check-', 'choose-numbers', '.choose-numbers', changeCheckbox);
  
  let checkLabels = document.querySelectorAll('.check-label');
  let allCheckbox = document.querySelectorAll('input[name="choose-numbers"]');
  
  document.querySelector('#btn-next').addEventListener('click', function() {
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    document.querySelector('#container-home').classList.add('hidden');
    document.querySelector('#container-bet').classList.remove('hidden');
    document.querySelector('#restantes').innerText = `${quantity - marcados} restantes`;
    verificaQuantidade();
  });
  
  document.querySelector('#btn-bet').addEventListener('click', function() {
    
    let overlay = document.querySelector('.overlay');
    let confirmation = document.querySelector('.confirmation');
    let confirmLabels = document.querySelector('.confirm-labels');
  
    confirmLabels.innerHTML = '';
  
    overlay.classList.remove('hidden');
    confirmation.classList.remove('hidden');
  
    for (const checkbox of allCheckbox) {
      
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('label-active');
  
      if (checkbox.checked) {
        label.innerText = checkbox.value < 10 ? '0' + checkbox.value : checkbox.value;
        confirmLabels.appendChild(label);
      }
    }
  })
  
  document.querySelector('#btn-cancelar').addEventListener('click', function() {
    document.querySelector('.overlay').classList.remove('show');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('.confirmation').classList.remove('show');
    document.querySelector('.confirmation').classList.add('hidden');
  })
  
  document.querySelector('#btn-voltar').addEventListener('click', function() {
    document.querySelector('#container-bet').classList.add('hidden');
    document.querySelector('#container-home').classList.remove('hidden');
  })
  
  
  function sorteio() {
    let numerosSorteados = [];
    let cont = 0;
    while (cont < 6) {
      let n = Math.floor(Math.random() * 60 + 1);
      let i = 0;
      if (numerosSorteados.length > 0) {
        for (const numero of numerosSorteados) {
          if (n === numero) {
            i++;
          }
        }
        if (i === 0) {
          numerosSorteados.push(n);
        } else {
          cont--;
        }
      } else {
        numerosSorteados.push(n);
      }
      cont++
    }
    return numerosSorteados;
  }
  
  function resultado() {
    let numerosSorteados = sorteio();
    let seusNumeros = document.querySelector('#seus-numeros');
    let titleResultado = document.querySelector('.title-resultado');
    let descriptionResultado = document.querySelector('.description-resultado');
    let cont = 0;
  
    document.querySelector('#container-bet').classList.add('hidden');
    document.querySelector('.confirmation').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('#resultado').classList.remove('hidden');
    
  
    for (const na of numerosSorteados) {
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('label-active');
      label.innerText = na < 10 ? '0' + na : na;
      document.querySelector('#numeros-sorteados').appendChild(label);
    }
  
    for (const checkbox of allCheckbox) {
      if (checkbox.checked) {
        let mylabel = document.createElement('label');
        mylabel.classList.add('label-static');
        mylabel.innerText = checkbox.value < 10 ? '0' + checkbox.value : checkbox.value;
  
        for (const numeroSorteado of numerosSorteados) {
          if (numeroSorteado == checkbox.value) {
            mylabel.classList.add('label-active');
            cont++;
          }
        }
        seusNumeros.appendChild(mylabel);
      }
    }
  
    if (cont > 3) {
      titleResultado.innerText = 'Parabéns! :D';
      if (cont === 4 || cont === 5) {
        descriptionResultado.innerHTML = `Você acertou ${cont} números e o seu prêmio é de <strong>R$ 9.500.000,00</strong>`;
      } else {
        descriptionResultado.innerHTML = `Você acertou ${cont} números e o seu prêmio é de <strong>R$ 50.000.000,00</strong>`;
      }
    } else {
      titleResultado.innerText = 'Não foi dessa vez! :(';
      if (cont === 0) {
        descriptionResultado.innerText = `Você não acertou nenhum número.`;
      } else if (cont === 1) {
        descriptionResultado.innerText = `Você acertou 1 número, mas ainda não foi o suficiente.`;
      } else {
        descriptionResultado.innerText = `Você acertou ${cont} números, mas ainda não foi o suficiente.`;
      }
    }
  }
  
  document.querySelector('#btn-play').addEventListener('click', resultado);
  
  document.querySelector('#btn-reload').addEventListener('click', function() {
    document.location.reload(true);
  });