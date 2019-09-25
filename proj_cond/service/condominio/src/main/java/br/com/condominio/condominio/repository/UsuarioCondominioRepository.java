package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.domain.UsuarioCondominio;
import br.com.condominio.condominio.domain.UsuarioCondominioPK;

@Transactional
public interface UsuarioCondominioRepository extends CrudRepository<UsuarioCondominio, UsuarioCondominioPK> {

}
