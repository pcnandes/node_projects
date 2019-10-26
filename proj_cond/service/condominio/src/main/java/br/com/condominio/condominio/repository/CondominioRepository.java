package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.model.Condominio;

@Transactional
public interface CondominioRepository extends CrudRepository<Condominio, Long> {

}
