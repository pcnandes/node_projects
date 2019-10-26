package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.model.Funcionario;

@Transactional
public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {

}
