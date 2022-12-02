
        let listaTarefas = [
            { id: 1, tarefa: 'Criar HTML', minutos: '30', feita: false },
            { id: 2, tarefa: 'Ajustar JS', minutos: '20', feita: false },
            { id: 3, tarefa: 'Entregar projeto', minutos: '10', feita: false }
        ];

        function addTarefa(tarefa) {
            listaTarefas.push(tarefa);
            renderizarTarefas();
        }

        function removerTarefa(id) {
            listaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id);
            renderizarTarefas();
        }

        function fazerTarefa(id, botao) {
            listaTarefas = listaTarefas.map(tarefa => {
                if (tarefa.id == id) {
                    tarefa.feita = !tarefa.feita;
                }
                return tarefa;
            });
            if (botao.innerText === 'Fazer') {
                botao.innerText = 'Desfazer';
                botao.classList.remove('btn-warning');
                botao.classList.add('btn-success');
            } else {
                botao.innerText = 'Fazer';
                botao.classList.remove('btn-success');
                botao.classList.add('btn-warning');

            }
        }

        function renderizarTarefas() {
            let listaUl = document.getElementById('listaUl');
            listaUl.innerHTML = '';
            listaTarefas.map(tarefa => {
                let li = document.createElement('li');
                li.classList.add('my-3');
                li.innerHTML = tarefa.tarefa;
                li.innerHTML += "  |  Quantidade de tempo: " + tarefa.minutos + " minutos";
                if (tarefa.feita === false) {

                    li.innerHTML += `&nbsp &nbsp <button type="button"
                                class="btn btn-sm btn-warning "
                                onclick="fazerTarefa(${tarefa.id}, this)">Fazer</button>`;
                }
                else {
                    li.innerHTML += `&nbsp &nbsp <button type="button"
                                class="btn btn-sm btn-success"
                                onclick="fazerTarefa(${tarefa.id}, this)">Desfazer</button>`;
                   
                                
                }
                li.innerHTML += `&nbsp &nbsp <button type="button"
                                class="btn btn-danger btn-sm"
                                onclick="removerTarefa(${tarefa.id})">Remover</button>`;

                listaUl.appendChild(li);
            });

            const somaMinutos = listaTarefas.reduce((acumulador, item) => {
                return acumulador + Number(item.minutos);
            }, 0);
            console.log(somaMinutos);

            const tempoTotal = document.getElementById('tempoTotal');
            tempoTotal.innerHTML = somaMinutos;

        }
        renderizarTarefas();

        const btnAdicionar = document.getElementById('btnAdicionar');
        btnAdicionar.addEventListener('click', function () {
            const tarefa = document.getElementById('tarefa').value;
            const minutos = document.getElementById('minutos').value;
            addTarefa(
                {
                    id: listaTarefas.length + 1,
                    tarefa: tarefa,
                    minutos: minutos,
                    feita: false
                });
        });